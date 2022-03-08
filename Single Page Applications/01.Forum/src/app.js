import { createTopic, loadTopics, showHomePage } from './homepage.js';
import { addComment } from './comments.js';

document.getElementById('main-form').addEventListener('submit', createTopic);
document.getElementById('comment-form').addEventListener('submit', addComment);

window.addEventListener('DOMContentLoaded', loadTopics);
showHomePage();