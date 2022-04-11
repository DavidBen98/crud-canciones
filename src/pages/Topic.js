import { useParams } from "react-router-dom";

const Topic = () => {
    let { topic } = useParams();

    return (
        <div>
            <h4>{topic}</h4>
        </div>
    );
}

export default Topic;