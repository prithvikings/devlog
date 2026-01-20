const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`
        relative h-full rounded-lg
        bg-white border border-zinc-300
        dark:bg-[#080808] dark:border-white/5
        shadow-sm dark:shadow-none
        transition-colors
        ${className}
      `}
    >
      <div className="h-full p-6">{children}</div>
    </div>
  );
};

export default Card;
