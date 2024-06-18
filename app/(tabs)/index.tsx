import { ThemedText, ThemedView } from "@/components";
import CalendarCard from "@/components/CalendarCard";
import { StyleSheet, FlatList } from "react-native";
import api from "@/services/api";
import { ChallengeData, Action } from "../models/ChallengeData";
import { useEffect, useState } from "react";

export default function Calendar() {
  const [data, setData] = useState<ChallengeData>();
  const { calendar, customer } = data ?? {};
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<ChallengeData>("/challenge");
        setData(response.data);
      } catch (error) {
        console.log("Error fetching data", error);
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <FlatList
        style={{ width: "90%" }}
        data={calendar}
        renderItem={({ item }) => {
          const date = new Date(item.year, item.month);

          const formattedDate = `${date.toLocaleString("en-US", {
            month: "long",
          })} ${date.getFullYear()}`;
          return (
            <ThemedView style={{ width: "100%" }}>
              <ThemedText style={styles.dateTitle}>{formattedDate}</ThemedText>

              {item.actions && item.actions.length > 0 ? (
                item.actions.map((action: Action, index) => (
                  <CalendarCard data={action} key={index} customer={customer} />
                ))
              ) : (
                <CalendarCard
                  data={null}
                  key="0"
                  customer={customer}
                  noData={true}
                />
              )}
            </ThemedView>
          );
        }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dateTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: "2%",
  },
});
