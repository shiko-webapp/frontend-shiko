interface ISpinnerProps {
  message: string;
}

export const Spinner = ({ message }: ISpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-muted-foreground animate-pulse">{message}</p>
    </div>
  );
};
