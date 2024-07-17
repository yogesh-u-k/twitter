import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";
import { POSTS } from "../../uitils/db/dummy";
import {useQuery} from "@tanstack/react-query"
import { useEffect } from "react";

const Posts = ({feedType}) => {
const getPostEndPoint = () => {
		switch(feedType){
			case "forYou":
				return "api/posts/all";
			case "following":
				return "api/posts/following";
			default:
				return "api/posts/all";
		}
	};

	const POST_ENDPOINT = getPostEndPoint();
	const{data:posts, isLoading,refetch, isRefetching} = useQuery({
		queryKey: ["posts"],
		queryFn: async()=>{
			try{
				const res = await fetch(POST_ENDPOINT)
				const data = await res.json();
				if(data.error) return null;
				if(!res.ok) throw new Error(data.error || 'Failed to fetch posts');
				console.log("POSTS is here:",data);
				return data;
			}
			catch(error){
				console.log(error);
				throw error;
			}
		}
	})

	useEffect(()=>{
		refetch();
	},[feedType, refetch])
	return (
		<>
			{(isLoading || isRefetching)&& (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)}
			{!isLoading && !isRefetching  && posts?.length === 0 && <p className='text-center my-4'>No posts in this tab. Switch 👻</p>}
			{!isLoading && !isRefetching && posts && (
				<div>
					{posts.map((post) => (
						<Post key={post._id} post={post} />
					))}
				</div>
			)}
		</>
	);
};
export default Posts;
