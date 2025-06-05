import { Container } from "@/components/container/container";
import {
  Dialog,
  Grid,
  Table,
  TableCell,
  TableRow,
  TableBody,
  Typography,
  TableHead,
  Button,
} from "@mui/material";
import { Box } from "@mui/material";
import { Stack } from "@mui/material";
import { CONFIG } from "../../../config-global";
import { UseBooleanReturn } from "@/hooks/use-boolean";
import { removeFromContext } from "../../../utils/local-storage";

export function InterviewRoomDialog({
  data,
  isOpen,
}: {
  data?:
    | {
        companyName: string;
        businessProblem: string;
        budget: string;
        purpose: string;
        scopeSummary: string;
        sowPdfPath: string;
      }
    | {};
  isOpen: UseBooleanReturn;
}) {
  const handlePrintPDF = () => {
    if (isOpen.value && data && "sowPdfPath" in data) {
      console.log("data");
      const form = document.createElement("form");
      form.method = "GET";
      form.action = `${CONFIG.site.apiUrl}/download-sow`;
      form.target = "_blank";

      // เพิ่ม input สำหรับแต่ละ field ที่ต้องการส่ง
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = "pdf_name";
      input.value = data.sowPdfPath;
      form.appendChild(input);

      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
      isOpen.onFalse();
      removeFromContext();
    }
  };

  return (
    <Dialog
      open={isOpen.value}
      fullWidth
      PaperProps={{
        sx: {
          m: 0, // margin 0
          position: "relative",
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 4 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h1">Summary</Typography>
        </Stack>
        <Table size="small" sx={{ minWidth: 1 }}>
          <TableHead>
            <TableRow>
              <TableCell>Field</TableCell>
              <TableCell>คําอธิบาย</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object?.entries(data || {}).map(([key, value]) => (
              <TableRow key={key}>
                {key !== "sowPdfPath" && (
                  <TableCell>
                    <Typography variant="body1">{key}</Typography>
                  </TableCell>
                )}
                {key !== "sowPdfPath" && (
                  <TableCell>
                    <Typography variant="body1">{value as string}</Typography>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Stack direction="row" justifyContent="flex-end">
          <Button variant="contained" color="primary" onClick={handlePrintPDF}>
            print PDF
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
}
