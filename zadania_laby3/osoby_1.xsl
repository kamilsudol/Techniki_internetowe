<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
<xsl:output method="html" version="1.0" indent="yes" doctype-system="about:legacy-compact" />
<xsl:template match="/">
        <html>
            <body> 
                Lista osob
                <table width="200" border="1"><tbody>
                    <tr><th colspan="4" align="center">UCZNIOWIE</th></tr>
                    <xsl:apply-templates select="//osoba[@rodzaj='uczen']" />
                    </tbody>
                </table>
                <br></br>
                <table border="1">
                    <tr><th colspan="3" align="center">NAUCZYCIELE</th></tr>
                    <tr>
                        <th><b>Imie</b></th>
                        <th><b>Nazwisko</b></th>
                        <th><b>Miasto</b></th>
                    </tr>
                    <xsl:apply-templates select="//osoba[@rodzaj='nauczyciel']" />
                </table>
            </body>
        </html>
</xsl:template>
<xsl:template match="//osoba[@rodzaj='uczen']" >
    <tr>
        <th align="right">Imie:</th>
        <td align="center"><xsl:value-of select="imie" /></td>
        <th align="right">Nazwisko:</th>
        <td align="center"><xsl:value-of select="nazwisko" /></td>
    </tr>
</xsl:template>
<xsl:template match="//osoba[@rodzaj='nauczyciel']" >
    <tr>
        <td align="center"><xsl:value-of select="imie" /></td>
        <td align="center"><xsl:value-of select="nazwisko" /></td>
        <td align="center"><xsl:value-of select="miasto" /></td>
    </tr>
</xsl:template>
</xsl:stylesheet>