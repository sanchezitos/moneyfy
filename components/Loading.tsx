import { Loader } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex items-center justify-center h-full w-full p-4">
            <div className="animate-spin animate-pulse rounded-full h-12 w-12 border-blue-500 border-opacity-70">
                <Loader className="text-purple-700 h-12 w-12" />
            </div>
        </div>
    )
}