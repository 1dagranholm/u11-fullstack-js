import { format } from "date-fns";

export function formatTimestamp(timestamp, timestampFormat = "HH:mm, d MMMM yyyy") {
    if (timestamp) {
        return format(new Date(timestamp), timestampFormat);
    } else {
        return;
    }
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }