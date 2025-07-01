import ReactPlayer from "react-player";
export function ReproductorVideo({url}){
    
    return (
        <div className="h-full flex flex-col w-full">
            <div className="flex-1 overflow-y-auto w-full">
                <ReactPlayer
                url={url}
                controls
                loop
                width='100%'
                />
            </div>
        </div>
    );
}