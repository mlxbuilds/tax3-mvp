import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowUpDown,
  Search,
  Filter,
  ExternalLink,
  ArrowUp,
  ArrowDown,
  CheckSquare,
  Square,
  Users,
  Building,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Transaction } from "@/types/transaction";

interface TransactionTableProps {
  transactions: Transaction[];
  onClassificationChange: (
    id: string,
    classification: "personal" | "business"
  ) => void;
  onBulkClassificationChange?: (
    transactionIds: string[],
    classification: "personal" | "business"
  ) => void;
}

type SortField = "timestamp" | "amount" | "type" | "token" | "gainLoss";
type SortDirection = "asc" | "desc";

export const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  onClassificationChange,
  onBulkClassificationChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [classificationFilter, setClassificationFilter] =
    useState<string>("all");
  const [directionFilter, setDirectionFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>("timestamp");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [selectedTransactions, setSelectedTransactions] = useState<Set<string>>(new Set());

  const filteredAndSortedTransactions = useMemo(() => {
    const filtered = transactions.filter((tx) => {
      const matchesSearch =
        searchTerm === "" ||
        tx.signature.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.token.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.type.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = typeFilter === "all" || tx.type === typeFilter;
      const matchesClassification =
        classificationFilter === "all" ||
        tx.classification === classificationFilter;
      const matchesDirection =
        directionFilter === "all" || tx.direction === directionFilter;

      return (
        matchesSearch &&
        matchesType &&
        matchesClassification &&
        matchesDirection
      );
    });

    // Sort transactions
    filtered.sort((a, b) => {
      let aValue: unknown;
      let bValue: unknown;

      switch (sortField) {
        case "timestamp":
          aValue = a.timestamp.getTime();
          bValue = b.timestamp.getTime();
          break;
        case "amount":
          aValue = a.amount;
          bValue = b.amount;
          break;
        case "type":
          aValue = a.type;
          bValue = b.type;
          break;
        case "token":
          aValue = a.token;
          bValue = b.token;
          break;
        case "gainLoss":
          aValue = a.gainLoss || 0;
          bValue = b.gainLoss || 0;
          break;
        default:
          aValue = a.timestamp.getTime();
          bValue = b.timestamp.getTime();
      }

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [
    transactions,
    searchTerm,
    typeFilter,
    classificationFilter,
    directionFilter,
    sortField,
    sortDirection,
  ]);

  const totalPages = Math.ceil(
    filteredAndSortedTransactions.length / itemsPerPage
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredAndSortedTransactions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const formatCurrency = (amount: number, token: string) => {
    if (token === "USDC" || token === "USD") {
      return `$${amount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }
    return `${amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    })} ${token}`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "transfer":
        return "bg-purple-500/20 text-purple-200 border-purple-500/30";
      case "trade":
        return "bg-primary/20 text-primary-foreground border-primary/30";
      case "staking":
        return "bg-emerald-500/20 text-emerald-200 border-emerald-500/30";
      case "swap":
        return "bg-orange-500/20 text-orange-200 border-orange-500/30";
      case "defi":
        return "bg-cyan-500/20 text-cyan-200 border-cyan-500/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleSelectTransaction = (transactionId: string, selected: boolean) => {
    const newSelected = new Set(selectedTransactions);
    if (selected) {
      newSelected.add(transactionId);
    } else {
      newSelected.delete(transactionId);
    }
    setSelectedTransactions(newSelected);
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      const allIds = new Set(paginatedTransactions.map(tx => tx.id));
      setSelectedTransactions(allIds);
    } else {
      setSelectedTransactions(new Set());
    }
  };

  const handleBulkClassification = (classification: "personal" | "business") => {
    if (onBulkClassificationChange && selectedTransactions.size > 0) {
      onBulkClassificationChange(Array.from(selectedTransactions), classification);
      setSelectedTransactions(new Set());
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <Card className="bg-card border-border">
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-4">
            <h3 className="text-lg font-sans font-semibold text-white">
              Transaction History
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>
                Showing {startIndex + 1}-
                {Math.min(
                  startIndex + itemsPerPage,
                  filteredAndSortedTransactions.length
                )}{" "}
                of {filteredAndSortedTransactions.length} transactions
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input border-border text-foreground"
              />
            </div>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="bg-input border-border text-foreground">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="transfer">Transfer</SelectItem>
                <SelectItem value="trade">Trade</SelectItem>
                <SelectItem value="staking">Staking</SelectItem>
                <SelectItem value="swap">Swap</SelectItem>
                <SelectItem value="defi">DeFi</SelectItem>
              </SelectContent>
            </Select>

            <Select value={directionFilter} onValueChange={setDirectionFilter}>
              <SelectTrigger className="bg-input border-border text-foreground">
                <SelectValue placeholder="Direction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Directions</SelectItem>
                <SelectItem value="in">Incoming</SelectItem>
                <SelectItem value="out">Outgoing</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={classificationFilter}
              onValueChange={setClassificationFilter}
            >
              <SelectTrigger className="bg-input border-border text-foreground">
                <SelectValue placeholder="Classification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classifications</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="unclassified">Unclassified</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => {
                setItemsPerPage(Number(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="bg-input border-border text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="25">25 per page</SelectItem>
                <SelectItem value="50">50 per page</SelectItem>
                <SelectItem value="100">100 per page</SelectItem>
                <SelectItem value="250">250 per page</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setTypeFilter("all");
                setClassificationFilter("all");
                setDirectionFilter("all");
                setCurrentPage(1);
              }}
              className="border-border text-foreground hover:bg-muted"
            >
              <Filter className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          </div>

          {/* Bulk Actions */}
          {selectedTransactions.size > 0 && (
            <div className="mt-4 p-4 bg-muted/20 border border-border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-foreground">
                    {selectedTransactions.size} transaction{selectedTransactions.size > 1 ? 's' : ''} selected
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleBulkClassification("personal")}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <Users className="w-4 h-4 mr-1" />
                      Mark as Personal
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleBulkClassification("business")}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Building className="w-4 h-4 mr-1" />
                      Mark as Business
                    </Button>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedTransactions(new Set())}
                  className="border-border text-muted-foreground hover:bg-muted"
                >
                  Clear Selection
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Transaction Table */}
      <Card className="bg-card border-border">
        <div className="overflow-x-auto">
          <Table className="data-table">
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedTransactions.size === paginatedTransactions.length && paginatedTransactions.length > 0}
                    onCheckedChange={(checked) => handleSelectAll(checked === true)}
                    className="border-border"
                  />
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleSort("timestamp")}
                >
                  <div className="flex items-center">
                    Date/Time
                    <ArrowUpDown className="ml-1 w-3 h-3" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleSort("type")}
                >
                  <div className="flex items-center">
                    Type
                    <ArrowUpDown className="ml-1 w-3 h-3" />
                  </div>
                </TableHead>
                <TableHead>Direction</TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-muted/50 transition-colors text-right"
                  onClick={() => handleSort("amount")}
                >
                  <div className="flex items-center justify-end">
                    Amount
                    <ArrowUpDown className="ml-1 w-3 h-3" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleSort("token")}
                >
                  <div className="flex items-center">
                    Token
                    <ArrowUpDown className="ml-1 w-3 h-3" />
                  </div>
                </TableHead>
                <TableHead className="text-right">USD Value</TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-muted/50 transition-colors text-right"
                  onClick={() => handleSort("gainLoss")}
                >
                  <div className="flex items-center justify-end">
                    Gain/Loss
                    <ArrowUpDown className="ml-1 w-3 h-3" />
                  </div>
                </TableHead>
                <TableHead>Classification</TableHead>
                <TableHead>Transaction</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTransactions.map((tx) => (
                <TableRow
                  key={tx.id}
                  className="border-border hover:bg-muted/30 transition-colors"
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedTransactions.has(tx.id)}
                      onCheckedChange={(checked) => handleSelectTransaction(tx.id, checked === true)}
                      className="border-border"
                    />
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {formatDate(tx.timestamp)}
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(tx.type)}>
                      {tx.type.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {tx.direction === "in" ? (
                        <ArrowDown className="w-4 h-4 text-emerald-400 mr-1" />
                      ) : (
                        <ArrowUp className="w-4 h-4 text-red-400 mr-1" />
                      )}
                      <span className="text-xs text-muted-foreground capitalize">
                        {tx.direction}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {tx.amount.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 6,
                    })}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {tx.token}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {tx.price
                      ? `$${(tx.amount * tx.price).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}`
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {tx.gainLoss !== undefined ? (
                      <span
                        className={
                          tx.gainLoss >= 0
                            ? "amount-positive"
                            : "amount-negative"
                        }
                      >
                        ${tx.gainLoss.toFixed(2)}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant={
                          tx.classification === "personal"
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          onClassificationChange(tx.id, "personal")
                        }
                        className={`h-6 px-2 text-xs ${
                          tx.classification === "personal"
                            ? "bg-primary text-primary-foreground"
                            : "border-border text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        Personal
                      </Button>
                      <Button
                        size="sm"
                        variant={
                          tx.classification === "business"
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          onClassificationChange(tx.id, "business")
                        }
                        className={`h-6 px-2 text-xs ${
                          tx.classification === "business"
                            ? "bg-primary text-primary-foreground"
                            : "border-border text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        Business
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <a
                      href={`https://solscan.io/tx/${tx.signature}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary hover:text-primary/80 text-xs"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="border-border text-foreground hover:bg-muted"
                >
                  Previous
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum =
                      Math.max(1, Math.min(totalPages - 4, currentPage - 2)) +
                      i;
                    return (
                      <Button
                        key={pageNum}
                        variant={
                          currentPage === pageNum ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className={
                          currentPage === pageNum
                            ? "bg-primary text-primary-foreground"
                            : "border-border text-foreground hover:bg-muted"
                        }
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="border-border text-foreground hover:bg-muted"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
