import { useEffect, useRef } from "react";
import { OfficeEngine } from "../game/engine";
import type { AgentState } from "../types";

interface OfficeCanvasProps {
  agents: AgentState[];
}

export default function OfficeCanvas({ agents }: OfficeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<OfficeEngine | null>(null);

  // Mount / unmount the engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const engine = new OfficeEngine(canvas);
    engineRef.current = engine;
    engine.start();

    return () => {
      engine.stop();
      engineRef.current = null;
    };
  }, []);

  // Push agent data into the engine whenever it changes
  useEffect(() => {
    engineRef.current?.updateAgents(agents);
  }, [agents]);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: "block" }}
    />
  );
}
