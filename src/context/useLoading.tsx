import React, {
  useState,
  createContext,
  useContext,
  type PropsWithChildren,
  type ReactElement,
} from "react";

interface LoadingContextType {
  isPending: boolean;
  setIsPending: React.Dispatch<React.SetStateAction<boolean>>;
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PendingContext = createContext<LoadingContextType | undefined>(
  undefined,
);

export const ErrorContext = createContext<LoadingContextType | undefined>(
  undefined,
);

export const PendingProvider = ({
  children,
}: PropsWithChildren): ReactElement => {
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <PendingContext.Provider
      value={{ isPending, setIsPending, isError, setIsError }}
    >
      {children}
    </PendingContext.Provider>
  );
};

export const usePending = (): LoadingContextType => {
  const context = useContext(PendingContext);
  if (!context) {
    throw new Error("usePending must be used within a PendingProvider");
  }
  return context;
};

export const useError = (): LoadingContextType => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useError must be used within a ErrorProvider");
  }
  return context;
};
