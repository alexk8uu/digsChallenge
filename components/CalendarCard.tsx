import { View, Text } from "react-native";
import React from "react";
import { Action, Customer } from "@/app/models/ChallengeData";
import { ThemedText, ThemedView } from "@/components";
import { CheckCircleIcon, MapPinIcon } from "react-native-heroicons/solid";
import { ClockIcon } from "react-native-heroicons/outline";
import { StyleSheet } from "react-native";

interface CalendarCardProps {
  data: Action | null;
  customer?: Customer;
  noData?: boolean;
}

const CalendarCard = (props: CalendarCardProps) => {
  const { data: action, customer, noData } = props;
  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const dateObj = new Date(action?.scheduledDate ?? "");
  const dayNumber = dateObj.getDate();
  const dayName = weekDays[dateObj.getDay()];
  const backgroundColor =
    action?.status === "Completed"
      ? "#00B47D"
      : action?.status === "Scheduled"
      ? "#006A4B"
      : action?.status === "Unscheduled"
      ? "#011638"
      : "#848FA5";

  if (noData) {
    return (
      <View style={[styles.cardContainer, { backgroundColor }]}>
        <Text style={styles.cardTitle}>No Maintenance Scheduled</Text>
      </View>
    );
  }

  return (
    <View
      style={[styles.rowItems, { alignItems: "flex-start", width: "100%" }]}
    >
      {action?.status === "Unscheduled" ? (
        <View style={styles.colItems}>
          <ThemedText>TBD</ThemedText>
        </View>
      ) : (
        <View style={[styles.colItems, { gap: 2 }]}>
          <ThemedText style={{ fontSize: 12, color: "gray" }}>
            {dayName}
          </ThemedText>
          <ThemedText style={{ fontSize: 18, fontWeight: "bold" }}>
            {dayNumber}
          </ThemedText>

          {action?.status === "Completed" ? (
            <CheckCircleIcon color={"#00B47D"} size={24} />
          ) : (
            <ClockIcon color={"#00B47D"} size={24} />
          )}
        </View>
      )}
      {action && (
        <View style={[styles.cardContainer, { backgroundColor }]}>
          <View style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Text style={styles.cardTitle}>{action.name}</Text>
            {action.status !== "Unscheduled" && (
              <>
                <Text style={styles.cardSubtitle}>
                  {action?.vendor?.vendorName}
                </Text>
                <Text style={styles.cardSubtitle}>
                  {action?.vendor?.phoneNumber}
                </Text>
              </>
            )}
          </View>
          <View style={[styles.rowItems, { gap: 3 }]}>
            <MapPinIcon size={20} color={"#fff"} />
            <Text style={styles.cardSubtitle}>{customer?.street}</Text>
          </View>
          <View style={[styles.rowItems, { gap: 10 }]}>
            {action.status !== "Unscheduled" && (
              <Text style={styles.cardSubtitle}>{action.status}</Text>
            )}
            {action.status === "Scheduled" && (
              <View style={[styles.rowItems, { gap: 10 }]}>
                <Text style={styles.cardSubtitle}>
                  {action.arrivalStartWindow}
                </Text>
                <Text style={styles.cardSubtitle}>
                  {action.arrivalEndWindow}
                </Text>
              </View>
            )}
            {action.status === "Unscheduled" && (
              <View style={[styles.rowItems, { gap: 10 }]}>
                <Text style={styles.cardSubtitle}>
                  Schedule date & time TBD
                </Text>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default CalendarCard;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 10,
    borderRadius: 4,
    gap: 5,
    marginVertical: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#fff",
  },
  rowItems: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  colItems: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 5,
  },
});
