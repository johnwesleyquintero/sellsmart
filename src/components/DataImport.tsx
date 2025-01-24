import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Papa from "papaparse";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileSpreadsheet, Table } from "lucide-react";

export function DataImport() {
  const [importedData, setImportedData] = useState<any[]>([]);
  const { toast } = useToast();

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          setImportedData(results.data);
          toast({
            title: "Data imported successfully",
            description: `${results.data.length} rows imported from CSV`,
          });
          console.log("Imported data:", results.data);
        },
        header: true,
        skipEmptyLines: true,
      });
    }
  };

  const handleGoogleSheetImport = (url: string) => {
    // Convert Google Sheets URL to CSV export URL
    const sheetId = url.match(/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)?.[1];
    if (!sheetId) {
      toast({
        title: "Invalid Google Sheets URL",
        description: "Please enter a valid Google Sheets URL",
        variant: "destructive",
      });
      return;
    }

    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
    
    // Fetch and parse CSV data
    fetch(csvUrl)
      .then(response => response.text())
      .then(data => {
        const results = Papa.parse(data, { header: true });
        setImportedData(results.data);
        toast({
          title: "Data imported successfully",
          description: `${results.data.length} rows imported from Google Sheets`,
        });
        console.log("Imported data:", results.data);
      })
      .catch(error => {
        toast({
          title: "Import failed",
          description: "Make sure the Google Sheet is publicly accessible",
          variant: "destructive",
        });
        console.error("Import error:", error);
      });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-spotify-light text-white">
      <CardHeader>
        <CardTitle>Import Data</CardTitle>
        <CardDescription className="text-gray-400">
          Import your data from various sources
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="csv" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="csv">CSV Upload</TabsTrigger>
            <TabsTrigger value="sheets">Google Sheets</TabsTrigger>
          </TabsList>
          
          <TabsContent value="csv">
            <div className="space-y-4">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="csv-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer hover:bg-spotify-darker/50"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FileSpreadsheet className="w-8 h-8 mb-2 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">CSV files only</p>
                  </div>
                  <Input
                    id="csv-upload"
                    type="file"
                    accept=".csv"
                    className="hidden"
                    onChange={handleCSVUpload}
                  />
                </label>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sheets">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  type="url"
                  placeholder="Paste Google Sheets URL"
                  className="flex-1 bg-spotify-darker border-gray-700"
                  onChange={(e) => {
                    const url = e.target.value;
                    if (url) handleGoogleSheetImport(url);
                  }}
                />
                <Button variant="secondary">
                  <Table className="w-4 h-4 mr-2" />
                  Import
                </Button>
              </div>
              <p className="text-xs text-gray-400">
                Make sure your Google Sheet is publicly accessible (View access)
              </p>
            </div>
          </TabsContent>
        </Tabs>

        {importedData.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Preview</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    {Object.keys(importedData[0]).map((header) => (
                      <th key={header} className="px-4 py-2 text-left border-b border-gray-700">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {importedData.slice(0, 5).map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((cell: any, cellIndex) => (
                        <td key={cellIndex} className="px-4 py-2 border-b border-gray-700">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {importedData.length > 5 && (
              <p className="text-sm text-gray-400 mt-2">
                Showing first 5 rows of {importedData.length} total rows
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}