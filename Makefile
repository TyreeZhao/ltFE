
distname = `data+%Y%m%d%H%M`
dev:
	# @rm -rf dist
	# @yarn run dist
	@yarn run dev

clean:
	@rm -rf dist

dist: clean
	@yarn run dist
	@tar -zcf "release-$(distname).tar.gz" dist
