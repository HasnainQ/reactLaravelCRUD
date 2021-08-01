import { useState, useEffect } from "react";
import AppContainer from "./AppContainer";
import { useHistory, useParams } from "react-router-dom";
import api from "../api";
const Edit = () => {
    const history = useHistory();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const onEditSubmit = async () => {
        setLoading(true);
        try {
            await api.updatePost(
                {
                    title,
                    description,
                },
                id
            );
            history.push("/");
        } catch {
            alert("Failed to edit post");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        api.getOnePost(id).then((res) => {
            const result = res.data;
            const post = result.data;
            setTitle(post.title);
            setDescription(post.description);
        });
    }, []);

    return (
        <AppContainer title="EDIT Post">
            <form action="">
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="form-group">
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={onEditSubmit}
                        disabled={loading}
                    >
                        {loading ? "LOADING" : "EDIT"}
                    </button>
                </div>
            </form>
        </AppContainer>
    );
};

export default Edit;
