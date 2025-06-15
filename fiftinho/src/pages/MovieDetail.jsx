import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetail } from "../services/tmdb";
import { toast } from "react-toastify";



export default function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");
    const [userCommented, setUserCommented] = useState(false);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getMovieDetail(id).then(setMovie);

        const storedComments = localStorage.getItem(`movie-${id}-comments`);
        if (storedComments) {
            setComments(JSON.parse(storedComments));
        }

        const userDidComment = localStorage.getItem(`movie-${id}-commented`);
        if (userDidComment === "true") {
            setUserCommented(true);
        }
    }, [id]);


    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (comment.trim() && rating > 0 && !userCommented) {
            const newComment = {
                text: comment.trim(),
                rating,
                date: new Date().toLocaleString(),
            };
            const updated = [newComment, ...comments];
            setComments(updated);
            setUserCommented(true);
            localStorage.setItem(`movie-${id}-comments`, JSON.stringify(updated));
            localStorage.setItem(`movie-${id}-commented`, "true");
            setComment("");
            setRating(0);
            toast.success("Commented!");
        }
    };



const handleDeleteComment = (indexToDelete) => {
    const updated = comments.filter((_, index) => index !== indexToDelete);
    setComments(updated);
    localStorage.setItem(`movie-${id}-comments`, JSON.stringify(updated));
    localStorage.setItem(`movie-${id}-commented`, "false");
    setUserCommented(false);

    toast.success("Comment Deleted!");
};

    

    if (!movie)
        return <div className="p-4">Loading...</div>

    return (
        <div className="p-4 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full md:w-1/3 rounded-4xl shodow"></img>

                <div>
                    <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
                    <p className="text-gray-500 mb-4">{movie.release_date}</p>
                    <p className="font-semibold">Puan: {Math.round(movie.vote_average * 10) / 10} ⭐️</p>
                    <p className="mb-4">{movie.overview}</p>
                    <div className="mt-4">
                        <span className="font-semibold">Türler: </span>
                        {movie.genres.map(genre => (
                            <span key={genre.id} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-4xl text-md mr-2">{genre.name}</span>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-10 border-t pt-6">
                <h2 className="text-2xl font-semibold mb-4">Rate and Comment</h2>

                {userCommented ? (
                    <p className="text-green-600 font-semibold mb-4">Already Commented. Thanks!</p>
                ) : (
                    <form onSubmit={handleCommentSubmit} className="mb-6">
                        <div className="flex space-x-2 text-2xl mb-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    className={star <= (hoverRating || rating) ? "text-yellow-400" : "text-gray-300"}
                                >
                                    ★
                                </button>
                            ))}
                        </div>
                        <textarea
                            className="w-full border rounded p-2 mb-3"
                            rows="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Yorumunuzu yazın..."
                        ></textarea>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-3xl hover:bg-blue-600">
                            Submit
                        </button>
                    </form>
                )}

                <h3 className="text-xl font-semibold mb-2">Comments</h3>
                {comments.length === 0 ? (
                    <p>Not Commented</p>
                ) : (
                    <ul className="space-y-4">
                        {comments.map((c, i) => (
                            <li key={i} className="border p-3 rounded-3xl shadow-xl">
                                <div className="flex justify-between items-center mb-1">
                                    <div className="text-yellow-400 text-lg">
                                        {"★".repeat(c.rating)}{"☆".repeat(5 - c.rating)}
                                    </div>
                                    <span className="text-sm text-gray-500">{c.date}</span>
                                </div>
                                <p>{c.text}</p>
                                <button onClick={() => handleDeleteComment(i)} className="mt-2 text-lg bg-red-500  rounded-3xl px-4 py-2 text-white hover:underline">Delete</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>


        </div>
    )
}