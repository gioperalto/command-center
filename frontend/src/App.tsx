import { useAgentStatus } from "./hooks/useAgentStatus";
import { useEvents } from "./hooks/useEvents";
import OfficeCanvas from "./components/OfficeCanvas";
import EventStream from "./components/EventStream";
import StatusBar from "./components/StatusBar";

export default function App() {
  const agents = useAgentStatus();
  const events = useEvents();

  return (
    <div style={{ display: "flex", height: "100vh", background: "#0a0a1a" }}>
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ flex: 1 }}>
          <OfficeCanvas agents={agents} />
        </div>
        <StatusBar agents={agents} />
      </div>
      <EventStream events={events} />
    </div>
  );
}
