
build: components index.js
	@component build --dev
	@touch build

start:
	@component serve &

components: component.json
	@component install --dev

test:
	@mocha-phantomjs -R list test/index.html

clean:
	rm -fr build components

.PHONY: clean start test
