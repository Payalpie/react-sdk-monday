import React, { useState, useRef } from "react";
import {
  Stage,
  Layer,
  Rect,
  Circle as KonvaCircle,
  Text as KonvaText,
  Line,
} from "react-konva";
import {
  Maximize2,
  Plus,
  Minus,
  MapPin,
  Link2,
  Pencil,
  Copy,
  FileImage,
  RefreshCw,
  Circle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function PlanCanvas({ onToolSelect, onTaskClick }) {
  const [tool, setTool] = useState("select");
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const stageRef = useRef(null);
  const [stageSize, setStageSize] = useState({ width: 800, height: 600 });
  const containerRef = useRef(null);
  const [isSpacePressed, setIsSpacePressed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [annotations, setAnnotations] = useState([]);
  const [hoveredAnnotationId, setHoveredAnnotationId] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentLine, setCurrentLine] = useState([]);
  const idCounter = useRef(0);
  const lastPointerRef = useRef({ x: 0, y: 0 });
  const isPanningRef = useRef(false);

  const generateId = () => {
    idCounter.current += 1;
    return `annotation-${idCounter.current}`;
  };

  React.useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setStageSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Handle spacebar for panning
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space" && !isSpacePressed) {
        e.preventDefault();
        setIsSpacePressed(true);
        if (containerRef.current) {
          containerRef.current.style.cursor = "grab";
        }
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        setIsSpacePressed(false);
        setIsDragging(false);
        if (containerRef.current) {
          containerRef.current.style.cursor = "default";
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isSpacePressed]);

  // Update cursor based on state changes
  React.useEffect(() => {
    if (containerRef.current) {
      if (isDragging) {
        containerRef.current.style.cursor = "grabbing";
      } else if (tool === "pan" || isSpacePressed) {
        containerRef.current.style.cursor = "grab";
      } else {
        containerRef.current.style.cursor = "default";
      }
    }
  }, [tool, isSpacePressed, isDragging]);

  const tools = [
    { icon: Maximize2, name: "fit", tooltip: "Fit to screen" },
    { icon: Plus, name: "zoom-in", tooltip: "Zoom in" },
    { icon: Minus, name: "zoom-out", tooltip: "Zoom out" },
    { icon: MapPin, name: "pin", tooltip: "Add pin" },
    { icon: Link2, name: "link", tooltip: "Add link" },
    { icon: Pencil, name: "draw", tooltip: "Draw" },
    { icon: Copy, name: "duplicate", tooltip: "Duplicate" },
    { icon: FileImage, name: "image", tooltip: "Add image" },
    { icon: RefreshCw, name: "rotate", tooltip: "Rotate" },
    { icon: Circle, name: "select", tooltip: "Select" },
  ];

  const handleToolClick = (toolName) => {
    onToolSelect?.(toolName);

    if (toolName === "zoom-in") {
      const stage = stageRef.current;
      if (stage) {
        const oldScale = scale;
        const newScale = Math.min(oldScale * 1.2, 5);
        
        const centerX = stageSize.width / 2;
        const centerY = stageSize.height / 2;
        
        const mousePointTo = {
          x: (centerX - position.x) / oldScale,
          y: (centerY - position.y) / oldScale,
        };
        
        setScale(newScale);
        setPosition({
          x: centerX - mousePointTo.x * newScale,
          y: centerY - mousePointTo.y * newScale,
        });
      }
      return;
    } else if (toolName === "zoom-out") {
      const stage = stageRef.current;
      if (stage) {
        const oldScale = scale;
        const newScale = Math.max(oldScale / 1.2, 0.1);
        
        const centerX = stageSize.width / 2;
        const centerY = stageSize.height / 2;
        
        const mousePointTo = {
          x: (centerX - position.x) / oldScale,
          y: (centerY - position.y) / oldScale,
        };
        
        setScale(newScale);
        setPosition({
          x: centerX - mousePointTo.x * newScale,
          y: centerY - mousePointTo.y * newScale,
        });
      }
      return;
    } else if (toolName === "fit") {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      return;
    } else if (toolName === "duplicate") {
      const selectedAnnotations = annotations.filter(a => a.selected);
      if (selectedAnnotations.length > 0) {
        const duplicated = selectedAnnotations.map(a => ({
          ...a,
          id: generateId(),
          x: a.x + 20,
          y: a.y + 20,
          selected: false
        }));
        setAnnotations([...annotations, ...duplicated]);
      }
      return;
    } else if (toolName === "rotate") {
      const rotatedAnnotations = annotations.map(a => {
        if (a.selected) {
          return { ...a, rotation: ((a.rotation || 0) + 45) % 360 };
        }
        return a;
      });
      setAnnotations(rotatedAnnotations);
      return;
    }

    setTool(toolName);

    if (containerRef.current) {
      if (toolName === "pan") {
        containerRef.current.style.cursor = "grab";
      } else if (toolName === "draw") {
        containerRef.current.style.cursor = "crosshair";
      } else {
        containerRef.current.style.cursor = "default";
      }
    }
  };

  const handleWheel = (e) => {
    e.evt.preventDefault();
    e.evt.stopPropagation();

    const stage = stageRef.current;
    if (!stage) return;

    const pointer = stage.getPointerPosition();
    if (!pointer) return;

    const oldScale = stage.scaleX();
    const oldX = stage.x();
    const oldY = stage.y();

    const zoomCenter = {
      x: (pointer.x - oldX) / oldScale,
      y: (pointer.y - oldY) / oldScale,
    };

    const scaleBy = 1.05;
    const newScale =
      e.evt.deltaY < 0
        ? Math.min(oldScale * scaleBy, 5)
        : Math.max(oldScale / scaleBy, 0.1);

    const newX = pointer.x - zoomCenter.x * newScale;
    const newY = pointer.y - zoomCenter.y * newScale;

    setScale(newScale);
    setPosition({ x: newX, y: newY });
  };

  const handleStageClick = (e) => {
    if (tool === "pan" || isSpacePressed || isDragging) return;
    
    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();
    
    const x = (pointerPosition.x - position.x) / scale;
    const y = (pointerPosition.y - position.y) / scale;

    if (tool === "pin") {
      setAnnotations([
        ...annotations,
        {
          id: generateId(),
          type: "pin",
          x,
          y,
          selected: false,
        },
      ]);
    } else if (tool === "link") {
      setAnnotations([
        ...annotations,
        {
          id: generateId(),
          type: "link",
          x,
          y,
          text: "Link",
          selected: false,
        },
      ]);
    } else if (tool === "image") {
      setAnnotations([
        ...annotations,
        {
          id: generateId(),
          type: "image",
          x,
          y,
          width: 100,
          height: 100,
          selected: false,
        },
      ]);
    } else if (tool === "select") {
      const clickedOnEmpty = e.target === stage || e.target.getLayer();
      if (clickedOnEmpty) {
        setAnnotations(annotations.map(a => ({ ...a, selected: false })));
      }
    }
  };

  const handleTaskDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("application/json");
    if (!data) return;

    let task;
    try {
      task = JSON.parse(data);
    } catch {
      return;
    }

    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    const pointerX = e.clientX - containerRect.left;
    const pointerY = e.clientY - containerRect.top;

    const x = (pointerX - position.x) / scale;
    const y = (pointerY - position.y) / scale;

    setAnnotations((prev) => [
      ...prev,
      {
        id: generateId(),
        type: "task",
        x,
        y,
        task,
        label: task.name,
        taskId: task.taskId,
        selected: false,
      },
    ]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleStageMouseDown = (e) => {
    if (e.evt.button === 1) {
      e.evt.preventDefault();
      isPanningRef.current = true;
      setIsDragging(true);
      const stage = stageRef.current;
      if (stage) {
        const pointer = stage.getPointerPosition();
        lastPointerRef.current = { x: pointer.x, y: pointer.y };
      }
      if (containerRef.current) {
        containerRef.current.style.cursor = "grabbing";
      }
      return;
    }

    if (tool === "draw" && !isSpacePressed) {
      setIsDrawing(true);
      const stage = e.target.getStage();
      const pointerPosition = stage.getPointerPosition();
      const x = (pointerPosition.x - position.x) / scale;
      const y = (pointerPosition.y - position.y) / scale;
      setCurrentLine([x, y]);
    }
  };

  const handleStageMouseMove = (e) => {
    if (!isDrawing || tool !== "draw") return;

    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();
    const x = (pointerPosition.x - position.x) / scale;
    const y = (pointerPosition.y - position.y) / scale;
    
    setCurrentLine([...currentLine, x, y]);
  };

  const handleStageMouseUp = (e) => {
    if (e.evt.button === 1) {
      isPanningRef.current = false;
      setIsDragging(false);
      if (containerRef.current) {
        if (tool === "pan" || isSpacePressed) {
          containerRef.current.style.cursor = "grab";
        } else {
          containerRef.current.style.cursor = "default";
        }
      }
      return;
    }

    if (isDrawing && tool === "draw") {
      setIsDrawing(false);
      if (currentLine.length > 2) {
        setAnnotations([
          ...annotations,
          {
            id: generateId(),
            type: "drawing",
            points: currentLine,
            selected: false,
          },
        ]);
      }
      setCurrentLine([]);
    }
  };

  const handleAnnotationClick = (annotation) => {
    if (tool === "select") {
      setAnnotations(
        annotations.map(a =>
          a.id === annotation.id ? { ...a, selected: !a.selected } : a
        )
      );
    }
  };

  const handleAnnotationDragEnd = (e, annotation) => {
    const newAnnotations = annotations.map(a => {
      if (a.id === annotation.id) {
        return {
          ...a,
          x: e.target.x(),
          y: e.target.y(),
        };
      }
      return a;
    });
    setAnnotations(newAnnotations);
  };

  const handleDragEnd = () => {
    isPanningRef.current = false;
    setIsDragging(false);

    if (containerRef.current) {
      if (tool === "pan" || isSpacePressed) {
        containerRef.current.style.cursor = "grab";
      } else {
        containerRef.current.style.cursor = "default";
      }
    }
  };

  const handleDragStart = () => {
    if ((tool === "pan" || isSpacePressed) && !isDragging) {
      isPanningRef.current = true;
      setIsDragging(true);
      const stage = stageRef.current;
      if (stage) {
        const pointer = stage.getPointerPosition();
        lastPointerRef.current = { x: pointer.x, y: pointer.y };
      }
      if (containerRef.current) {
        containerRef.current.style.cursor = "grabbing";
      }
    }
  };

  const handleDragMove = (e) => {
    if (isPanningRef.current && (tool === "pan" || isSpacePressed)) {
      e.evt.preventDefault();
      const stage = stageRef.current;
      if (stage) {
        const pointer = stage.getPointerPosition();
        if (!pointer) return;

        const dx = pointer.x - lastPointerRef.current.x;
        const dy = pointer.y - lastPointerRef.current.y;

        const newX = position.x + dx;
        const newY = position.y + dy;

        setPosition({ x: newX, y: newY });
        lastPointerRef.current = { x: pointer.x, y: pointer.y };
      }
    }
  };

  const handleMouseEnter = () => {
    if (containerRef.current) {
      if (isDragging) {
        containerRef.current.style.cursor = "grabbing";
      } else if (tool === "pan" || isSpacePressed) {
        containerRef.current.style.cursor = "grab";
      } else if (tool === "draw") {
        containerRef.current.style.cursor = "crosshair";
      } else {
        containerRef.current.style.cursor = "default";
      }
    }
  };

  return (
    <div className="relative flex flex-col w-full h-full bg-gray-100">
      <div className="absolute z-10 flex flex-col gap-0.5 p-2 bg-gray-900 rounded-lg shadow-2xl left-4 top-4 border border-gray-700">
        {tools.map((t, idx) => (
          <button
            key={idx}
            onClick={() => handleToolClick(t.name)}
            className={`p-2.5 rounded transition duration-200 transform hover:scale-110 ${
              tool === t.name
                ? "bg-blue-600 text-white shadow-lg"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
            title={t.tooltip}
          >
            <t.icon size={18} strokeWidth={2} />
          </button>
        ))}
      </div>

      <div
        ref={containerRef}
        className="flex-1 relative bg-white border-[#ddd]"
        style={{
          cursor: isDragging
            ? "grabbing"
            : tool === "pan" || isSpacePressed
            ? "grab"
            : "default",
        }}
        onDragOver={handleDragOver}
        onDrop={handleTaskDrop}
      >
        <Stage
          ref={stageRef}
          width={stageSize.width}
          height={stageSize.height}
          scaleX={scale}
          scaleY={scale}
          x={position.x}
          y={position.y}
          draggable={false}
          onWheel={handleWheel}
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
          onMouseDown={handleStageMouseDown}
          onMouseMove={handleStageMouseMove}
          onMouseUp={handleStageMouseUp}
          onMouseEnter={handleMouseEnter}
          onClick={handleStageClick}
        >
          <Layer>
            <Rect
              x={0}
              y={0}
              width={stageSize.width / scale}
              height={stageSize.height / scale}
              fill="#f8f8f8"
            />
            
            {annotations.map((annotation) => {
              if (annotation.type === "pin") {
                return (
                  <React.Fragment key={annotation.id}>
                    <KonvaCircle
                      x={annotation.x}
                      y={annotation.y}
                      radius={8}
                      fill={annotation.selected ? "#3b82f6" : "#ef4444"}
                      stroke={annotation.selected ? "#1e40af" : "#b91c1c"}
                      strokeWidth={2}
                      draggable={tool === "select"}
                      onClick={() => handleAnnotationClick(annotation)}
                      onDragEnd={(e) => handleAnnotationDragEnd(e, annotation)}
                    />
                    <KonvaCircle
                      x={annotation.x}
                      y={annotation.y}
                      radius={3}
                      fill="white"
                    />
                  </React.Fragment>
                );
              } else if (annotation.type === "link") {
                return (
                  <React.Fragment key={annotation.id}>
                    <Rect
                      x={annotation.x - 30}
                      y={annotation.y - 12}
                      width={60}
                      height={24}
                      fill={annotation.selected ? "#3b82f6" : "#10b981"}
                      cornerRadius={4}
                      draggable={tool === "select"}
                      onClick={() => handleAnnotationClick(annotation)}
                      onDragEnd={(e) => handleAnnotationDragEnd(e, annotation)}
                    />
                    <KonvaText
                      x={annotation.x - 25}
                      y={annotation.y - 8}
                      text={annotation.text}
                      fontSize={14}
                      fill="white"
                      fontStyle="bold"
                    />
                  </React.Fragment>
                );
              } else if (annotation.type === "image") {
                return (
                  <Rect
                    key={annotation.id}
                    x={annotation.x}
                    y={annotation.y}
                    width={annotation.width}
                    height={annotation.height}
                    fill={annotation.selected ? "#dbeafe" : "#e5e7eb"}
                    stroke={annotation.selected ? "#3b82f6" : "#9ca3af"}
                    strokeWidth={2}
                    cornerRadius={4}
                    draggable={tool === "select"}
                    rotation={annotation.rotation || 0}
                    onClick={() => handleAnnotationClick(annotation)}
                    onDragEnd={(e) => handleAnnotationDragEnd(e, annotation)}
                  />
                );
              } else if (annotation.type === "drawing") {
                return (
                  <Line
                    key={annotation.id}
                    points={annotation.points}
                    stroke={annotation.selected ? "#3b82f6" : "#000000"}
                    strokeWidth={2}
                    tension={0.5}
                    lineCap="round"
                    lineJoin="round"
                    onClick={() => handleAnnotationClick(annotation)}
                  />
                );
              } else if (annotation.type === "task") {
                const showTooltip = hoveredAnnotationId === annotation.id;
                return (
                  <React.Fragment key={annotation.id}>
                    <KonvaCircle
                      x={annotation.x}
                      y={annotation.y}
                      radius={7}
                      fill="#2563eb"
                      stroke="#1e40af"
                      strokeWidth={2}
                      onClick={() => onTaskClick?.(annotation.task)}
                      onMouseEnter={() => setHoveredAnnotationId(annotation.id)}
                      onMouseLeave={() => setHoveredAnnotationId(null)}
                    />
                    <KonvaCircle
                      x={annotation.x}
                      y={annotation.y}
                      radius={2.5}
                      fill="white"
                    />
                    {annotation.taskId && (
                      <KonvaText
                        x={annotation.x + 10}
                        y={annotation.y - 6}
                        text={annotation.taskId}
                        fontSize={11}
                        fill="#1f2937"
                      />
                    )}
                    {showTooltip && (
                      <React.Fragment>
                        <Rect
                          x={annotation.x + 10}
                          y={annotation.y - 28}
                          width={Math.max(90, (annotation.label || "").length * 6)}
                          height={22}
                          fill="#111827"
                          cornerRadius={6}
                          opacity={0.9}
                        />
                        <KonvaText
                          x={annotation.x + 16}
                          y={annotation.y - 23}
                          text={annotation.label || "Task"}
                          fontSize={11}
                          fill="#f9fafb"
                        />
                      </React.Fragment>
                    )}
                  </React.Fragment>
                );
              }
              return null;
            })}
            
            {isDrawing && currentLine.length > 2 && (
              <Line
                points={currentLine}
                stroke="#000000"
                strokeWidth={2}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
              />
            )}
          </Layer>
        </Stage>
      </div>

      <div className="absolute z-10 flex items-center gap-2 px-4 py-2 transform -translate-x-1/2 bg-gray-800 rounded-lg shadow-lg bottom-3 left-1/2">
        <button className="p-1 text-gray-300 rounded hover:bg-gray-700">
          <ChevronLeft size={20} />
        </button>
        <span className="px-3 text-sm text-white">000 - Notes Page 2</span>
        <button className="p-1 text-gray-300 rounded hover:bg-gray-700">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="absolute z-10 px-4 py-2 bg-gray-800 rounded-lg shadow-lg bottom-3 right-3">
        <span className="text-sm text-white">2024-04-10</span>
      </div>

      <div className="absolute z-10 transform -translate-x-1/2 bg-white border border-gray-300 rounded-lg shadow-lg top-3 left-1/2 w-96">
        <input
          type="text"
          placeholder="Search annotations, symbols..."
          className="w-full px-4 py-2 text-sm rounded-lg outline-none"
        />
      </div>
    </div>
  );
}
