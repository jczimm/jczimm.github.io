#!/bin/sh

echo "Building index.html..."

echo "> Curl CSS libraries"
echo ">> Curl normalize.css"

normalizecss=`curl https://cdnjs.cloudflare.com/ajax/libs/normalize/4.2.0/normalize.min.css`

echo "<<"
echo "<"

echo "> Create source for index.html"
echo ">> Create <style amp-custom></style>"

style="/*style.css*/$(cleancss ./style.css | autoprefixer-cli -o -)/*normalize.css*/$(echo "$normalizecss")"

echo "<<"

echo ">> Edit skeleton.html source"

dev_only="s/BEGIN_DEV.*END_DEV//g"
style_dest="s@<style amp-custom>@<style amp-custom>$style@g"
indexhtml=`sed -e "$style_dest" -e "$dev_only" skeleton.html`

echo "<<"

echo ">> Create index.html"

echo "$indexhtml" > ../index.html

echo "<<"
echo "<"

echo "Built index.html."
