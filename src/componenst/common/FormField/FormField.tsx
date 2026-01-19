import { useFormContext, Path, FieldError, FieldValues } from 'react-hook-form';

interface FormFieldProps<TFormValues extends FieldValues = FieldValues> {
  name: Path<TFormValues>;
  label: string;
  type?: string;
  className?: string;
}

export default function FormField<TFormValues extends FieldValues>({
  name,
  label,
  type = 'text',
  className = ''
}: FormFieldProps<TFormValues>) {
  const { register, formState: { errors } } = useFormContext<TFormValues>();
  const error = errors[name] as FieldError;

  return (
    <label className={`${className}`}>
      <span >{label}</span>
      <input 
        {...register(name)}
        type={type}
      />
      {error && (
        <span>
          {error.message || 'Ошибка'}
        </span>
      )}
    </label>
  );
}
