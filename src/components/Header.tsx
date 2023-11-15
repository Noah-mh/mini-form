import { signIn, signOut, useSession } from "next-auth/react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const Header = () => {
    const { data: sessionData } = useSession();

    return (
        <>
            <header className="bg-gray-400">
                <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <a href="" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                        </a>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-4">
                        <p className="text-center text-2xl text-gray-900">
                            {sessionData && <span>Welcome {sessionData.user?.name}</span>}
                        </p>
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        {sessionData?.user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="bg-transparent hover:bg-transparent">
                                        <Avatar>
                                            <AvatarImage src={sessionData?.user?.image ?? ""} alt="@shadcn" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>{sessionData.user?.name}</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => void signOut()}>
                                        Sign Out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button variant="outline" onClick={() => void signIn()}>Sign in</Button>
                        )}
                    </div>
                </nav>

            </header>

        </>
    )
}
