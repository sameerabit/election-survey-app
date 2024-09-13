"use client";
import React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(
    error: any
  ): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, inf: any) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
  }

  render() {
    // You can render any custom fallback UI
    if (
      (this.state as ErrorBoundaryState).hasError
    ) {
      // You can render any custom fallback UI
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h1 className="text-4xl font-bold text-red-500">
              Oops!
            </h1>
            <p className="mt-4 text-gray-700">
              Something went wrong.
            </p>
            <button
              onClick={() =>
                window.location.reload()
              }
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return (this.props as any).children;
  }
}

export default ErrorBoundary;
