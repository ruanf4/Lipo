
import { useEffect } from "react";
import { sendPageSixNotification } from "@/lib/email-service";

export const usePageSixNotification = (userData: any) => {
  useEffect(() => {
    sendPageSixNotification(userData).catch(error => {
      console.error("Failed to send page 6 notification:", error);
    });
  }, []);
};
