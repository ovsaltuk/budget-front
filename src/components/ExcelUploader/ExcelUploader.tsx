import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionsApi } from '../../api/transactionsApi';

export const ExcelUploader = () => {
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: (formData: FormData) => transactionsApi.uploadExcelTransactions(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      alert('✅ Импорт успешен!');
    }
  });

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('excel', file);
      uploadMutation.mutate(formData);
    }
  };

  return (
    <div>
      <input 
        type="file" 
        accept=".xlsx,.xls" 
        onChange={handleFile}
        disabled={uploadMutation.isPending}
      />
      {uploadMutation.isPending && <div>⏳ Импорт...</div>}
    </div>
  );
};
