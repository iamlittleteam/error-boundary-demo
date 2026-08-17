"use client";

import React from "react";
import { ApiError, UIError } from "./errors";

interface Props {
  children: React.ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ManualErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (error instanceof ApiError) {
      console.error("[ApiError]", error.status, error.message);
    } else {
      console.error("[UIError]", error.message, errorInfo.componentStack);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  render() {
    const { error, hasError } = this.state;

    if (hasError && error instanceof ApiError) {
      return (
        <div className="card space-y-3 border-red-900">
          <h3 className="text-lg font-semibold text-red-400">
            เชื่อมต่อเซิร์ฟเวอร์ไม่สำเร็จ
          </h3>
          <p className="text-gray-400 text-sm">
            รหัส: {error.status} — {error.message}
          </p>
          <button className="btn btn-danger" onClick={this.handleRetry}>
            ลองใหม่
          </button>
        </div>
      );
    }

    if (hasError) {
      // ครอบทั้ง UIError instance และ error ทั่วไปที่ throw มาเฉยๆ
      return (
        <div className="card space-y-3 border-yellow-900">
          <h3 className="text-lg font-semibold text-yellow-400">
            เกิดข้อผิดพลาดในการแสดงผล
          </h3>
          <p className="text-gray-400 text-sm">{error?.message}</p>
          <button className="btn btn-outline" onClick={this.handleRetry}>
            ลองใหม่
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
