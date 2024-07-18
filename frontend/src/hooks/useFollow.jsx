import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";

const useFollow = () => {
    const queryClient = useQueryClient();
    const { mutate:follow, isPending} = useMutation({
        mutationFn: async (userid) => {
            const res = await fetch(`/api/users/follow/${userid}`, {
                method: "POST",
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to follow user");
            return data;
        },          
        onSuccess: () => {  
            
            Promise.all([
                queryClient.invalidateQueries({ queryKey: ["suggestedUsers"] }),
            queryClient.invalidateQueries({ queryKey: ["authUser"] }),
            ])
            
            
        },
        onError: (error) => {   
            toast.error(error.message);
        },
    });

    return {follow, isPending}
}

export default useFollow;