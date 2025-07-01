import ReactPlayer from "react-player";
export function ReproductorVideo(){
    
    return (
        <div className="h-full flex flex-col w-full">
            <div className="flex-1 overflow-y-auto w-full">
                <ReactPlayer
                url="/20231007_214238.mp4"
                controls
                loop
                width='100%'
                />
            </div>
        </div>
    );
}