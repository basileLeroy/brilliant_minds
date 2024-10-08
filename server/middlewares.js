const checkCreateParams = (req, res, next) => {
    const { title, description } = req.body;

    if ((title && description) && (title.trim() && description.trim())){
        next();
    } else {
        res.status(400).json({code: 400, message: "Bad request"});
    }
}

export {
    checkCreateParams
}