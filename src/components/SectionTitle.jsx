function SectionTitle({ className, children }) {
  return (
    <div className={`${className} flex justify-between items-center`}>
      {children}
    </div>
  );
}

export default SectionTitle;
