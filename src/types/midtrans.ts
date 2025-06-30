export interface MidtransCallbackResult {
  status_code: string;
  status_message: string;
  transaction_id: string;
  order_id: string;
  gross_amount: string;
  payment_type: string;
  transaction_time: string;
  transaction_status: string;
  fraud_status: string;
}

export interface MidtransSnapOptions {
  onSuccess?: (result: MidtransCallbackResult) => void;
  onPending?: (result: MidtransCallbackResult) => void;
  onError?: (result: MidtransCallbackResult) => void;
  onClose?: () => void;
}

export interface MidtransSnap {
  pay: (token: string, options?: MidtransSnapOptions) => void;
}
