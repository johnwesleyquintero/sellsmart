import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus, Edit, Trash2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataSource {
  id: string;
  name: string;
  source_type: 'google_sheets' | 'csv';
  config: Record<string, any>;
  header_mapping: Record<string, string>;
  is_active: boolean;
}

export function DataSourceList() {
  const { data: dataSources, refetch } = useQuery({
    queryKey: ['data-sources'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('data_source_configs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as DataSource[];
    }
  });

  const toggleDataSource = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('data_source_configs')
        .update({ is_active: isActive })
        .eq('id', id);

      if (error) throw error;

      toast.success(`Data source ${isActive ? 'activated' : 'deactivated'}`);
      refetch();
    } catch (error) {
      toast.error('Failed to update data source');
    }
  };

  const deleteDataSource = async (id: string) => {
    try {
      const { error } = await supabase
        .from('data_source_configs')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Data source deleted');
      refetch();
    } catch (error) {
      toast.error('Failed to delete data source');
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Data Sources</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Data Source
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataSources?.map((source) => (
            <TableRow key={source.id} className="hover:bg-gray-100">
              <TableCell>{source.name}</TableCell>
              <TableCell className="capitalize">{source.source_type}</TableCell>
              <TableCell>
                <Button
                  variant={source.is_active ? "default" : "secondary"}
                  size="sm"
                  onClick={() => toggleDataSource(source.id, !source.is_active)}
                >
                  {source.is_active ? (
                    <Check className="w-4 h-4 mr-2" />
                  ) : (
                    <X className="w-4 h-4 mr-2" />
                  )}
                  {source.is_active ? 'Active' : 'Inactive'}
                </Button>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteDataSource(source.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
