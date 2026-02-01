import "../styles/loadouts.css";

export default function DraggableLoadout(props: any) {
  return (
    <div
      className="draggable-loadout"
      draggable
      onDragStart={props.onDragStart}
      onDragOver={props.onDragOver}
      onDrop={props.onDrop}
    >
      {props.children}
    </div>
  );
}
