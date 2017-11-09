module.exports = function (mongoose) {

	const projectSchema = new mongoose.Schema({
		title: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		skills: [{
			name: {
				type: String,
				required: true
			}
		}],
		created_at: {
			type: Number,
			default: Date.now
		},
		updated_at: {
			type: Number,
			default: Date.now
		},
		is_deleted: {
			type: Boolean,
			default: false
		}
	});
	const project = mongoose.model('Project', projectSchema);

	return project;
}