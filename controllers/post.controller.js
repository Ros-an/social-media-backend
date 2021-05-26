exports.getPosts = (req, res) => {
  res.json({
    post: [
      {
        post1: "my first post",
      },
      {
        post2: "my second post",
      },
    ],
  });
};
