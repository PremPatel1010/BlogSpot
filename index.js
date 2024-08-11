import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 3000;



// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

let blogs = [];

app.get("/", (req, res) => {
  res.render("index.ejs", { blogs });
});

app.get("/blogs/new", (req, res) => {
  res.render("createBlog.ejs");
});

app.post("/blogs", (req, res) => {
  const { title, content } = req.body;
  const id = blogs.length + 1;
  blogs.push({ id, title, content });
  res.redirect("/");
});

app.post("/submit", (req, res) => {
  res.render("submit.ejs");
});

app.get('/blogs/:id', (req, res) => {
  const blog = blogs.find(b => b.id === parseInt(req.params.id));
  res.render('view.ejs', { blog });
});

app.get('/blogs/:id/view', (req,res) => {
  const blog = blogs.find(b => b.id === parseInt(req.params.id));
  res.render('view.ejs', { blog });
});

app.get('/blogs/:id/edit', (req,res) => {
  const blog = blogs.find(b => b.id === parseInt(req.params.id));
  res.render('edit.ejs', { blog });
});

app.post('/blogs/:id', (req, res) => {
  const { id, title, content } = req.body;
  const blog = blogs.find(b => b.id === parseInt(id));
  blog.title = title;
  blog.content = content;
  res.redirect(`/blogs/${id}`);
});

app.post('/blogs/:id/delete', (req, res) => {
  blogs = blogs.filter(b => b.id !== parseInt(req.params.id));
  res.redirect('/');
});

app.listen(port, () => {
  console.log("server is running...");
});
