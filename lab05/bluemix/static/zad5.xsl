<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
<xsl:output method="html" version="1.0" indent="yes" doctype-system="about:legacy-compact" />
<xsl:param name="sortby"/>
<xsl:template match="/">
    <html>
        <head>
            <title>Zad 05</title>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
            <link rel="stylesheet" type="text/css" href="styl.css"/>
        </head>
        <body>
            <fieldset id="fs" style="width:250px;text-align:center; font-weight:bold;background-color: rgb(133, 133, 179);">
            <p>Sortuj według:</p>
                <p style="display:inline;"><a href="http://pascal.fis.agh.edu.pl/~8sudol/cgi-bin/zad_5.py?sort=wydzial">Po wydziale</a></p>
                <p style="display:inline"><a href="http://pascal.fis.agh.edu.pl/~8sudol/cgi-bin/zad_5.py?sort=nazwisko">Po nazwisku</a></p>
                <p style="display:inline"><a href="http://pascal.fis.agh.edu.pl/~8sudol/cgi-bin/zad_5.py">Nie sortuj</a></p>
            </fieldset>
            <table class="uczelnia" border="1">
                <xsl:choose>
                    <xsl:when test="$sortby = 'wydzial'">
                        <xsl:for-each select="/uczelnia//wydzial">
                            <xsl:sort select="nazwa/text()"/>
                            <xsl:call-template name="wydzial"/>
                        </xsl:for-each>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:for-each select="/uczelnia//wydzial">
                            <xsl:call-template name="wydzial"/>
                        </xsl:for-each>
                    </xsl:otherwise>
                </xsl:choose>
            </table>
        </body>
    </html>
</xsl:template>


<xsl:template name="wydzial" >
    <tr><th class="nazwa" colspan="4"><xsl:value-of select="nazwa"/></th></tr>
    <xsl:for-each select="kierunek">
            <xsl:call-template name="kierunek"/>
    </xsl:for-each>
</xsl:template>

<xsl:template name="kierunek" >
    <tr><th class="kier_nazw" colspan="4"><xsl:value-of select="kier_nazw"/></th></tr>
        <tr>
            <th class="kier_nazw"><b>Numer</b></th>
            <th class="kier_nazw"><b>Imie</b></th>
            <th class="kier_nazw"><b>Nazwisko</b></th>
            <th class="kier_nazw"><b>Indeks</b></th>
        </tr>
        
        <xsl:choose>
            <xsl:when test="$sortby = 'nazwisko'">
                <xsl:for-each select="studenci">
                    <xsl:sort select="nazwisko/text()"/>
                    <xsl:call-template name="studenci"/>
                </xsl:for-each>
            </xsl:when>
            <xsl:otherwise>
                <xsl:for-each select="studenci">
                    <xsl:call-template name="studenci"/>
                </xsl:for-each>
            </xsl:otherwise>
        </xsl:choose>    
</xsl:template>

<xsl:template name="studenci" >
    <tr>
        <td><xsl:number value="position()" format="1 "/></td>
        <td><xsl:value-of select="imie" /></td>
        <td><xsl:value-of select="nazwisko" /></td>
        <td><xsl:value-of select="indeks" /></td>
    </tr>
</xsl:template>

</xsl:stylesheet>