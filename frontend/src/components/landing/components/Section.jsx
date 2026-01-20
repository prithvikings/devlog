const Section = ({ children, className = "", id = "" }) => (
  <section
    id={id}
    // Added 'scroll-mt-28': This creates the buffer for the fixed navbar
    className={`relative z-10 max-w-5xl mx-auto px-6 py-20 scroll-mt-24 ${className}`}
  >
    {children}
  </section>
);

export default Section;
