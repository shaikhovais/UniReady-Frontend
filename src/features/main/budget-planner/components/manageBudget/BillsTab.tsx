import { useEffect, useMemo, useState } from "react";

import { Box } from "@mui/material";

import BillForm from "./BillForm";
import BillList from "./BillList";

import type {
  Bill,
  BudgetCategory,
  SaveBillRequest,
} from "../../../../../types/features/budget";

import type { Lookup } from "../../../../../types/core/common/Lookup";

interface BillsTabProps {
  bills: Bill[];
  paymentMethods: Lookup[];
  billFrequencies: Lookup[];
  budgetCategories: BudgetCategory[];
  onSave: (request: SaveBillRequest) => Promise<void>;
  onDelete: (billId: number) => Promise<void>;
  onCancel: () => void;
}

const BillsTab = ({
  bills,
  paymentMethods,
  billFrequencies,
  budgetCategories,
  onSave,
  onDelete,
  onCancel,
}: BillsTabProps) => {
  const emptyBill: SaveBillRequest = useMemo(
    () => ({
      name: "",
      amount: 0,
      dueDate: "",
      frequencyId:
        billFrequencies.find((x) => x.name === "Monthly")?.id ?? 0,
      autoAddExpense: true,
      paymentMethodId: -1,
      userBudgetCategoryId: -1,
      notes: "",
    }),
    [billFrequencies],
  );

  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [bill, setBill] = useState<SaveBillRequest>(emptyBill);
  const [focusNameTrigger, setFocusNameTrigger] = useState(0);

  const selectBill = (selected: Bill) => {
    setSelectedBill(selected);

    setBill({
      billId: selected.billId,
      name: selected.name ?? "",
      amount: selected.amount ?? 0,
      dueDate: selected.dueDate ?? "",
      frequencyId: selected.frequencyId,
      autoAddExpense: selected.autoAddExpense,
      paymentMethodId: selected.paymentMethodId ?? -1,
      userBudgetCategoryId: selected.userBudgetCategoryId ?? -1,
      notes: selected.notes ?? "",
    });
  };

  useEffect(() => {
    if (bills.length === 0) {
      setSelectedBill(null);
      setBill(emptyBill);
      return;
    }

    if (selectedBill) {
      const updatedSelectedBill = bills.find(
        (item) => item.billId === selectedBill.billId,
      );

      if (updatedSelectedBill) {
        selectBill(updatedSelectedBill);
        return;
      }
    }

    setSelectedBill(null);
    setBill(emptyBill);
  }, [bills, emptyBill, selectedBill]);

  const addBill = () => {
    setSelectedBill(null);
    setBill({ ...emptyBill });
    setFocusNameTrigger((previous) => previous + 1);
  };

  const handleDeleteBill = async (billId: number) => {
    await onDelete(billId);

    setSelectedBill(null);
    setBill({ ...emptyBill });
  };

  const handleSaveBill = async () => {
    await onSave(bill);

    setSelectedBill(null);
    setBill({ ...emptyBill });
  };

  return (
    <Box
      sx={{
        position: "relative",
        p: {
          xs: 0,
          lg: 0.5,
        },
        borderRadius: 2.5,
        background:
          "linear-gradient(135deg, #F7FBFF 0%, #F9FCFF 48%, #F6FBF8 100%)",

        "&::before": {
          content: '""',
          position: "absolute",
          top: -30,
          left: -30,
          width: 140,
          height: 140,
          borderRadius: "50%",
          background: "rgba(219, 234, 254, 0.28)",
          pointerEvents: "none",
          zIndex: 0,
        },

        "&::after": {
          content: '""',
          position: "absolute",
          bottom: -35,
          right: -25,
          width: 150,
          height: 150,
          borderRadius: "50%",
          background: "rgba(220, 252, 231, 0.25)",
          pointerEvents: "none",
          zIndex: 0,
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "360px minmax(0, 1fr)",
          },
          gap: 2,
          alignItems: "stretch",
        }}
      >
        <BillList
          bills={bills}
          selectedBillId={selectedBill?.billId}
          paymentMethods={paymentMethods}
          onSelectBill={selectBill}
          onDeleteBill={handleDeleteBill}
          onAddBill={addBill}
        />

        <BillForm
          bill={bill}
          selectedBill={selectedBill}
          paymentMethods={paymentMethods}
          frequencies={billFrequencies}
          budgetCategories={budgetCategories}
          onChange={setBill}
          onSave={handleSaveBill}
          focusNameTrigger={focusNameTrigger}
          onDelete={() => {
            if (selectedBill) {
              handleDeleteBill(selectedBill.billId);
            }
          }}
          onCancel={onCancel}
        />
      </Box>
    </Box>
  );
};

export default BillsTab;