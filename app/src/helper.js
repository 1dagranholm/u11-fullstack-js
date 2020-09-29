import { format } from "date-fns";

export function formatTimestamp(timestamp, timestampFormat = "HH:ii dd LLL yyyy") {
    if (timestamp) {
        return format(new Date(timestamp), timestampFormat);
    } else {
        return;
    }
}
