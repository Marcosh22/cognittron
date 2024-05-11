import { Dialog, DialogOverlay } from "../ui/dialog";

function Loader({ show = false }: { show?: boolean }) {
  return (
    <Dialog open={show}>
        <DialogOverlay >
      <div className="h-full w-full flex items-center justify-center">
        <svg
          width={80}
          height={80}
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          className="w-48 h-48"
        >
          <circle
            cx={40}
            cy={47}
            r={3}
            fill="#7357FF"
            stroke="#7357FF"
            strokeWidth={2}
            className="animate-fade"
            style={{opacity: '0.6', animationDelay: '0.4s'}}
          />
          <circle
            cx={48}
            cy={35}
            r={3}
            fill="#7357FF"
            stroke="#7357FF"
            strokeWidth={2}
            className="animate-fade"
            style={{opacity: '0.3', animationDelay: '0.2s'}}
          />
          <circle
            cx={32}
            cy={35}
            r={3}
            fill="#7357FF"
            stroke="#7357FF"
            strokeWidth={2}
            className="animate-fade"
          />
        </svg>
      </div>
      </DialogOverlay>
    </Dialog>
  );
}

export default Loader;
