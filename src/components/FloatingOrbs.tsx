export default function FloatingOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        className="absolute w-72 h-72 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, rgba(56,189,248,0.4) 0%, transparent 70%)",
          top: "10%",
          left: "5%",
          animation: "orb-drift 12s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-96 h-96 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, rgba(129,140,248,0.3) 0%, transparent 70%)",
          bottom: "15%",
          right: "10%",
          animation: "orb-drift 15s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute w-64 h-64 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)",
          top: "50%",
          left: "60%",
          animation: "orb-drift 10s ease-in-out infinite 2s",
        }}
      />
      <div
        className="absolute w-48 h-48 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, rgba(14,165,233,0.3) 0%, transparent 70%)",
          top: "20%",
          right: "30%",
          animation: "orb-drift 8s ease-in-out infinite 1s",
        }}
      />
    </div>
  );
}
