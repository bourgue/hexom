var conn_url = 'mongodb://127.0.0.1:27017/hexamenu';

if (process.env.OPENSHIFT_MONGODB_DB_URL) {
  conn_url = process.env.OPENSHIFT_MONGODB_DB_URL +
    process.env.OPENSHIFT_APP_NAME;
}

module.exports = {
	'url' : conn_url
};
