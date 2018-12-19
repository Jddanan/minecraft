from bottle import route, run, static_file, template


@route('/')
def index():
    return template("index.html", root='')


@route('/css/<filename:re:.*css>')
def css(filename):
    return static_file(filename, root='css')


@route('/js/<filename:re:.*js>')
def js(filename):
    return static_file(filename, root='js')


@route('/images/<filename>')
def images(filename):
    return static_file(filename, root='images')


@route('/sound/<filename>')
def sound(filename):
    return static_file(filename, root='sound')


def main():
    run(host='localhost', port=7000)


if __name__ == '__main__':
    main()

