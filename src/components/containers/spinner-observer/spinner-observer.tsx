import { Loader } from "@/components/ui";
import { useInView } from "react-intersection-observer";

type Props = {
  onIntersect: () => void;
};

export const SpinnerObserver: React.FC<Props> = ({ onIntersect }) => {
  const { ref } = useInView({
    onChange(inView) {
      if (inView) {
        onIntersect();
      }
    },
  });
  return (
    <div ref={ref} className="flex justify-center items-center">
      <Loader />
    </div>
  );
};
