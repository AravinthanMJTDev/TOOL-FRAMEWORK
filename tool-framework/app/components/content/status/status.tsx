const Status = ({ status, bgColor }: { status: string; bgColor: string }) => {
  return <div style={{ backgroundColor: bgColor }}>{status}</div>;
};
export default Status;
