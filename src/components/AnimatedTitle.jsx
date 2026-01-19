import clsx from "clsx";

const AnimatedTitle = ({ title, containerClass }) => {
  return (
    <div className={clsx(containerClass)}>
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight">
        {title}
      </h1>
    </div>
  );
};

export default AnimatedTitle;
