import { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
	const { id } = useParams();
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		setLoading(true);
		axios
			.get(`https://mern-bookstore-nwrh.onrender.com/api/books/${id}`)
			.then(({ data }) => {
				setTitle(data.title);
				setAuthor(data.author);
				setPublishYear(data.publishYear);
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				alert('An error occured. Please check console or try again.');
				console.log(error);
			});
	}, []);

	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [publishYear, setPublishYear] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleEditBook = () => {
		const data = {
			title,
			author,
			publishYear,
		};
		setLoading(true);
		axios
			.put(`https://mern-bookstore-nwrh.onrender.com/api/books/${id}`, data)
			.then(() => {
				setLoading(false);
				enqueueSnackbar('Book edited successfully', { variant: 'success' });
				navigate('/');
			})
			.catch((error) => {
				setLoading(false);
				enqueueSnackbar('Error', { variant: 'error' });
				console.log(error);
			});
	};

	return (
		<div className="p-4">
			<BackButton />
			<h1 className="text-3xl my-4">Edit Book</h1>
			{loading ? <Spinner /> : ''}
			<div className="flex flex-col border-2 border-sky-400 rounded-xl max-w-[600px] p-4 mx-auto">
				<div className="my-4">
					<label className="text-xl mr-4 text-gray-500">Title</label>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="border-2 bordre-gray-500 px-4 py-2 w-full"
					/>
					<label className="text-xl mr-4 text-gray-500">Author</label>
					<input
						type="text"
						value={author}
						onChange={(e) => setAuthor(e.target.value)}
						className="border-2 bordre-gray-500 px-4 py-2 w-full"
					/>
					<label className="text-xl mr-4 text-gray-500">Publish Year</label>
					<input
						type="number"
						value={publishYear}
						onChange={(e) => setPublishYear(e.target.value)}
						className="border-2 bordre-gray-500 px-4 py-2 w-full"
					/>
				</div>
				<button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
					Save
				</button>
			</div>
		</div>
	);
};

export default EditBook;
