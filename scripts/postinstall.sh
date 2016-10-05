manage="${VENV}/bin/python ${INSTALLDIR}/${REPO}/manage.py"

$manage migrate --noinput --settings=project.settings
$manage collectstatic --noinput --settings=project.settings
$manage load_photosizes --settings=project.settings
