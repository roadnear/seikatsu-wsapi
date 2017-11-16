module.exports = function (mongoose) {

	const beautifyUnique = require('mongoose-beautiful-unique-validation');
	const projectSchema = new mongoose.Schema({
		title: {
			type: String,
			required: true,
			unique: true
		},
		description: {
			type: String,
			required: true
		},
		skills: [{
			_id: false,
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
	projectSchema.index({
		title: 'text',
		description: 'text'
	});
	projectSchema.plugin(beautifyUnique);
	const project = mongoose.model('Project', projectSchema);


	return project;
}